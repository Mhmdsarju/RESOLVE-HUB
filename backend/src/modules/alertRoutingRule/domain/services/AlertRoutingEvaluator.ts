import {
    AlertRoutingCondition,
    AlertRoutingRule,
} from "../entities/alertRoutingRule.entity";

import { Alert } from "@/modules/alert/domain/entities/alert.entity";

export class AlertRoutingEvaluator {

    matches(rule: AlertRoutingRule, alert: Alert): boolean {
        return this.evaluateCondition(rule.conditions, alert);
    }

    private evaluateCondition(
        condition: AlertRoutingCondition,
        alert: Alert,
    ): boolean {

        if (condition.all) {
            return condition.all.every((childCondition) =>
                this.evaluateCondition(childCondition, alert),
            );
        }

        if (condition.any) {
            return condition.any.some((childCondition) =>
                this.evaluateCondition(childCondition, alert),
            );
        }

        if (
            condition.field &&
            condition.operator &&
            condition.value !== undefined
        ) {
            return this.evaluateFieldCondition(
                condition.field,
                condition.operator,
                condition.value,
                alert,
            );
        }

        return false;
    }

    private evaluateFieldCondition(
        field: string,
        operator: string,
        expectedValue: string | number | boolean,
        alert: Alert,
    ): boolean {

        const actualValue = this.getFieldValue(field, alert);

        switch (operator) {

            case "EQ":
                return actualValue === expectedValue;

            case "GT":
                return (
                    typeof actualValue === "number" &&
                    typeof expectedValue === "number" &&
                    actualValue > expectedValue
                );

            case "GTE":
                return (
                    typeof actualValue === "number" &&
                    typeof expectedValue === "number" &&
                    actualValue >= expectedValue
                );

            case "LT":
                return (
                    typeof actualValue === "number" &&
                    typeof expectedValue === "number" &&
                    actualValue < expectedValue
                );

            case "LTE":
                return (
                    typeof actualValue === "number" &&
                    typeof expectedValue === "number" &&
                    actualValue <= expectedValue
                );

            default:
                return false;
        }
    }

    private getFieldValue(
        field: string,
        alert: Alert,
    ): string | number | boolean | undefined {

        if (field in alert) {
            return alert[field as keyof Alert] as
                | string
                | number
                | boolean
                | undefined;
        }

        if (
            alert.payload &&
            typeof alert.payload === "object" &&
            field in alert.payload
        ) {
            return (
                alert.payload as Record<
                    string,
                    string | number | boolean
                >
            )[field];
        }

        if (
            alert.payload &&
            typeof alert.payload === "object" &&
            "labels" in alert.payload &&
            typeof alert.payload.labels === "object" &&
            alert.payload.labels !== null &&
            field in alert.payload.labels
        ) {
            return (
                alert.payload.labels as Record<
                    string,
                    string | number | boolean
                >
            )[field];
        }

        return undefined;
    }
}