"""Subscription plans and server-side entitlements for HKBEES.

This module is deliberately independent from the web framework so the same
rules can be tested and reused by HTTP handlers, background jobs and billing
webhooks. Client-side feature hiding must never replace these checks.
"""

from dataclasses import asdict, dataclass
from enum import StrEnum
from typing import Final


class PlanCode(StrEnum):
    BEGINNER = "beginner"
    PRO = "pro"
    FARM = "farm"
    ENTERPRISE = "enterprise"


class Feature(StrEnum):
    CORE_REGISTER = "core_register"
    OFFLINE_MOBILE = "offline_mobile"
    QR_IDENTIFICATION = "qr_identification"
    HONEY_TRACEABILITY = "honey_traceability"
    VOICE_INSPECTIONS = "voice_inspections"
    AI_ASSISTANT = "ai_assistant"
    TEAM_MANAGEMENT = "team_management"
    IOT_MONITORING = "iot_monitoring"
    API_ACCESS = "api_access"
    MULTI_FARM = "multi_farm"
    PRIORITY_SUPPORT = "priority_support"


@dataclass(frozen=True, slots=True)
class Plan:
    code: PlanCode
    label: str
    min_hives: int
    max_hives: int | None
    max_users: int | None
    max_apiaries: int | None
    included_ai_credits: int
    max_iot_devices: int
    features: frozenset[Feature]

    def allows(self, feature: Feature) -> bool:
        return feature in self.features

    def accepts_hive_count(self, hive_count: int) -> bool:
        if hive_count < self.min_hives:
            return False
        return self.max_hives is None or hive_count <= self.max_hives

    def public_dict(self) -> dict:
        data = asdict(self)
        data["code"] = self.code.value
        data["features"] = sorted(feature.value for feature in self.features)
        return data


CORE: Final = frozenset(
    {Feature.CORE_REGISTER, Feature.OFFLINE_MOBILE, Feature.QR_IDENTIFICATION}
)

PLAN_CATALOG: Final[dict[PlanCode, Plan]] = {
    PlanCode.BEGINNER: Plan(
        code=PlanCode.BEGINNER,
        label="Débutant",
        min_hives=0,
        max_hives=10,
        max_users=1,
        max_apiaries=2,
        included_ai_credits=20,
        max_iot_devices=0,
        features=CORE,
    ),
    PlanCode.PRO: Plan(
        code=PlanCode.PRO,
        label="Pro",
        min_hives=11,
        max_hives=399,
        max_users=3,
        max_apiaries=None,
        included_ai_credits=300,
        max_iot_devices=20,
        features=CORE
        | frozenset(
            {
                Feature.HONEY_TRACEABILITY,
                Feature.VOICE_INSPECTIONS,
                Feature.AI_ASSISTANT,
                Feature.TEAM_MANAGEMENT,
            }
        ),
    ),
    PlanCode.FARM: Plan(
        code=PlanCode.FARM,
        label="Exploitation",
        min_hives=400,
        max_hives=999,
        max_users=10,
        max_apiaries=None,
        included_ai_credits=1500,
        max_iot_devices=250,
        features=CORE
        | frozenset(
            {
                Feature.HONEY_TRACEABILITY,
                Feature.VOICE_INSPECTIONS,
                Feature.AI_ASSISTANT,
                Feature.TEAM_MANAGEMENT,
                Feature.IOT_MONITORING,
                Feature.API_ACCESS,
                Feature.PRIORITY_SUPPORT,
            }
        ),
    ),
    PlanCode.ENTERPRISE: Plan(
        code=PlanCode.ENTERPRISE,
        label="Entreprise",
        min_hives=1000,
        max_hives=None,
        max_users=None,
        max_apiaries=None,
        included_ai_credits=5000,
        max_iot_devices=10_000,
        features=frozenset(Feature),
    ),
}


def plan_for_hive_count(hive_count: int) -> Plan:
    if hive_count < 0:
        raise ValueError("hive_count must be non-negative")
    for plan in PLAN_CATALOG.values():
        if plan.accepts_hive_count(hive_count):
            return plan
    raise RuntimeError("plan catalog has an uncovered hive count")


def require_feature(plan_code: PlanCode, feature: Feature) -> None:
    if not PLAN_CATALOG[plan_code].allows(feature):
        raise PermissionError(
            f"feature '{feature.value}' is not available on plan '{plan_code.value}'"
        )


def public_catalog() -> list[dict]:
    return [plan.public_dict() for plan in PLAN_CATALOG.values()]

