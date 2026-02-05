"use client";

import React from "react";
import { z } from "zod";

export const riskAlertsCardPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  alerts: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        reason: z.string().optional(),
        severity: z.string().optional(),
        timeframe: z.string().optional(),
      })
    )
    .optional(),
});

export type RiskAlertsCardProps = z.infer<typeof riskAlertsCardPropsSchema>;

export function RiskAlertsCard(props: RiskAlertsCardProps) {
  const { title, subtitle, alerts } = props;

  // While Tambo is streaming, these can be undefined.
  if (!alerts || alerts.length === 0) {
    return null; // or your loading / empty state UI
  }

  return (
    <section className="risk-alerts-card">
      {title && <h2 className="risk-alerts-card__title">{title}</h2>}
      {subtitle && (
        <p className="risk-alerts-card__subtitle">{subtitle}</p>
      )}

      <ul className="risk-alerts-card__list">
        {alerts.map((alert, index) => {
          const key = alert.id ?? `${index}`;

          return (
            <li key={key} className="risk-alerts-card__item">
              {alert.name && (
                <h3 className="risk-alerts-card__item-title">
                  {alert.name}
                </h3>
              )}

              {alert.reason && (
                <p className="risk-alerts-card__item-reason">
                  {alert.reason}
                </p>
              )}

              <div className="risk-alerts-card__item-meta">
                {alert.severity && (
                  <span className="risk-alerts-card__badge">
                    {alert.severity}
                  </span>
                )}
                {alert.timeframe && (
                  <span className="risk-alerts-card__timeframe">
                    {alert.timeframe}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
