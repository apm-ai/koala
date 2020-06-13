import React from 'react';
import { stylesFactory } from 'src/core/library/utils/theme'; 
import { css, cx } from 'emotion';

export interface FieldValidationMessageProps {
  children: string;
  className?: string;
}

export const getFieldValidationMessageStyles = stylesFactory(() => {
  return {
    fieldValidationMessage: css`
      font-size: 12px;
      font-weight: 500;
      margin: 4px 0 0 0;
      padding: 4px 8px;
      color: #ffffff;
      background: #e02f44;
      border-radius: 2px;
      position: relative;
      display: inline-block;

      &:before {
        content: '';
        position: absolute;
        left: 9px;
        top: -4px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #e02f44;
      }
    `,
    fieldValidationMessageIcon: css`
      margin-right: 8px;
    `,
  };
});

export const FieldValidationMessage: React.FC<FieldValidationMessageProps> = ({ children, className }) => {
  const styles = getFieldValidationMessageStyles();

  return (
    <div className={cx(styles.fieldValidationMessage, className)}>
      {children}
    </div>
  );
};
