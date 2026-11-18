import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "backend"))

from app.plans import Feature, PlanCode, plan_for_hive_count, public_catalog, require_feature


class PlanCatalogTests(unittest.TestCase):
    def test_boundaries_select_expected_plans(self):
        cases = {
            0: PlanCode.BEGINNER,
            10: PlanCode.BEGINNER,
            11: PlanCode.PRO,
            399: PlanCode.PRO,
            400: PlanCode.FARM,
            999: PlanCode.FARM,
            1000: PlanCode.ENTERPRISE,
            100_000: PlanCode.ENTERPRISE,
        }
        for hive_count, expected in cases.items():
            with self.subTest(hive_count=hive_count):
                self.assertEqual(plan_for_hive_count(hive_count).code, expected)

    def test_negative_hive_count_is_rejected(self):
        with self.assertRaises(ValueError):
            plan_for_hive_count(-1)

    def test_beginner_cannot_use_ai_assistant(self):
        with self.assertRaises(PermissionError):
            require_feature(PlanCode.BEGINNER, Feature.AI_ASSISTANT)

    def test_farm_can_use_iot(self):
        require_feature(PlanCode.FARM, Feature.IOT_MONITORING)

    def test_public_catalog_is_serializable(self):
        catalog = public_catalog()
        self.assertEqual(len(catalog), 4)
        self.assertEqual(catalog[0]["code"], "beginner")
        self.assertIsInstance(catalog[0]["features"], list)


if __name__ == "__main__":
    unittest.main()

