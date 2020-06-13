import React from 'react';
import { stylesFactory } from 'src/core/library/utils/theme';
import { css, cx } from 'emotion';
import { RightOutlined } from '@ant-design/icons';
import tinycolor from 'tinycolor2';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  description?: React.ReactNode;
  category?: string[];
}

export const getLabelStyles = stylesFactory(() => {
  return {
    label: css`
      label: Label;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.25;
      margin: 0 0 4px 0;
      padding: 0 0 0 2px;
      color: #9fa7b3;
      max-width: 480px;
    `,
    labelContent: css`
      display: flex;
      align-items: center;
    `,
    description: css`
      label: Label-description;
      color: #7b8087;
      font-size: 12px;
      font-weight: 400;
      margin-top: 2px;
      display: block;
    `,
    categories: css`
      label: Label-categories;
      color: ${false
        ? tinycolor("#9fa7b3")
            .lighten(10)
            .toHexString()
        : tinycolor("#9fa7b3")
            .darken(10)
            .toHexString()};
      display: inline-flex;
      align-items: center;
    `,
    chevron: css`
      margin: 0 2px;
    `,
  };
});

export const Label: React.FC<LabelProps> = ({ children, description, className, category, ...labelProps }) => {
  const styles = getLabelStyles();
  const categories = category?.map((c, i) => {
    return (
      <span className={styles.categories} key={`${c}/${i}`}>
        <span>{c}</span>
        <RightOutlined className={styles.chevron} />
      </span>
    );
  });

  return (
    <div className={cx(styles.label, className)}>
      <label {...labelProps}>
        <div className={styles.labelContent}>
          {categories}
          {children}
        </div>
        {description && <span className={styles.description}>{description}</span>}
      </label>
    </div>
  );
};
