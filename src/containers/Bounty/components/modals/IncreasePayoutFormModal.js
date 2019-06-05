import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import normalizers from 'utils/normalizers';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';
import asyncValidators from 'utils/asyncValidators';
import intl from 'react-intl-universal';

class IncreasePayoutFormModal extends React.Component {
  validatorGroups = {
    balance: [
      validators.minOrEqualsValue(0),
      validators.maxDecimals(this.props.tokenDecimals),
      validators.maxDecimals(this.props.tokenDecimals),
      (balance, values) => {
        if (
          BigNumber(values.fulfillmentAmount || 0, 10).isGreaterThan(
            BigNumber(this.props.minimumBalance, 10).plus(
              BigNumber(balance || 0, 10)
            )
          )
        ) {
          return intl.get(
            'sections.bounty.modals.increase_payout.balance_warning'
          );
        }
      }
    ],
    fulfillmentAmount: [
      validators.required,
      validators.maxDecimals(this.props.tokenDecimals),
      validators.minValue(0),
      (fulfillmentAmount, values) => {
        if (
          BigNumber(this.minimumPayout || 0).isGreaterThanOrEqualTo(
            BigNumber(values.fulfillmentAmount || 0, 10)
          )
        ) {
          return intl.get(
            'sections.bounty.modals.increase_payout.payout_warning'
          );
        }
      }
    ]
  };

  render() {
    const {
      onClose,
      minimumBalance,
      minimumPayout,
      handleSubmit,
      tokenSymbol,
      visible,
      submitFailed,
      invalid,
      asyncValidating
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Modal
          dismissable={true}
          onClose={onClose}
          visible={visible}
          fixed
          size="small"
        >
          <Modal.Header closable={true}>
            <Modal.Message>
              {intl.get('sections.bounty.modals.increase_payout.title')}
            </Modal.Message>
            <Modal.Description>
              {intl.getHTML(
                'sections.bounty.modals.increase_payout.description',
                {
                  tokenSymbol,
                  minimumBalance,
                  minimumPayout,
                  textHighlightClass: styles.textHighlight
                }
              )}
            </Modal.Description>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Field
              name="balance"
              component={FormTextInput}
              label={intl.get(
                'sections.bounty.modals.increase_payout.form.balance.label',
                { tokenSymbol }
              )}
              normalize={normalizers.number}
              validate={this.validatorGroups.balance}
              placeholder={intl.get(
                'sections.bounty.modals.increase_payout.form.balance.placeholder'
              )}
            />
            <div className={styles.inputGroup}>
              <Field
                name="fulfillmentAmount"
                component={FormTextInput}
                label={intl.get(
                  'sections.bounty.modals.increase_payout.form.fullfillment_amount.label',
                  { tokenSymbol }
                )}
                normalize={normalizers.number}
                validate={this.validatorGroups.fulfillmentAmount}
                placeholder={intl.get(
                  'sections.bounty.modals.increase_payout.form.fullfillment_amount.placeholder'
                )}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {submitFailed &&
              invalid && (
                <Text inputLabel color="red">
                  {intl.get('errors.form_error')}
                </Text>
              )}
            <Button
              margin
              onClick={e => {
                e.preventDefault();
                onClose();
              }}
              buttonType="button"
            >
              {intl.get('actions.cancel')}
            </Button>
            <Button
              type="action"
              disabled={submitFailed && invalid}
              loading={asyncValidating && typeof asyncValidating === 'boolean'}
            >
              {intl.get('actions.increase_payout')}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'increasePayout',
    destroyOnUnmount: false,
    asyncValidate: (values, dispatch, props, field) => {
      return asyncValidators.tokenValidationWrapper(
        { ...values, tokenContract: props.tokenContract },
        'balance',
        'tokenContract',
        props.asyncValidating,
        field,
        dispatch
      );
    },
    asyncChangeFields: ['balance']
  }),
  ModalFormReset
)(IncreasePayoutFormModal);
