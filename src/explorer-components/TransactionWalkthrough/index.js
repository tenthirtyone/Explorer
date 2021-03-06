import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionWalkthrough.module.scss';
import { Text, Modal, Button } from 'components';
import intl from 'react-intl-universal';

const InitiateWalkthrough = props => {
  const { onClose, visible, onConfirm } = props;

  return (
    <Modal onClose={onClose} visible={visible} fixed size="small">
      <Modal.Header icon="wallet">
        <Modal.Message>{intl.get('components.tx_guide.title')}</Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          <Text className={styles.textBreak}>
            {intl.get('components.tx_guide.description')}
          </Text>
          <Text>{intl.get('components.tx_guide.notice')}</Text>
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          {intl.get('actions.cancel')}
        </Button>
        <Button type="primary" onClick={onConfirm}>
          {intl.get('actions.ok')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

InitiateWalkthrough.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func
};

const PendingWalletConfirm = props => {
  const { visible } = props;

  return (
    <Modal visible={visible} fixed size="small">
      <Modal.Header loadingIcon>
        <Modal.Message>
          {intl.get('components.tx_guide.messages.pending_wallet')}
        </Modal.Message>
      </Modal.Header>
    </Modal>
  );
};

PendingWalletConfirm.propTypes = {
  text: PropTypes.string
};

const PendingReceipt = props => {
  const { onClose, visible, toDashboard } = props;

  return (
    <Modal dismissable onClose={onClose} visible={visible} fixed size="small">
      <Modal.Header loadingIcon closable>
        <Modal.Message>
          {intl.get('components.tx_guide.messages.waiting')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {intl.get('components.tx_guide.messages.pending_receipt')}
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          {intl.get('actions.close')}
        </Button>
        <Button type="primary" onClick={toDashboard}>
          {intl.get('actions.dashboard')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PendingReceipt.propTypes = {
  onClose: PropTypes.func,
  text: PropTypes.string,
  visible: PropTypes.bool,
  toDashboard: PropTypes.func
};

const WalkthroughError = props => {
  const { onClose, visible, errorText } = props;

  return (
    <Modal dismissable onClose={onClose} fixed size="small" visible={visible}>
      <Modal.Header icon="error" closable />
      <Modal.Body>
        <Modal.Message>{intl.get('errors.500')}</Modal.Message>
        <Modal.Description>{errorText}</Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>{intl.get('actions.close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

WalkthroughError.propTypes = {
  onClose: PropTypes.func,
  errorText: PropTypes.string
};

const WalkthroughSuccess = props => {
  const { onClose, visible, toDashboard, buttonText, successLink } = props;

  return (
    <Modal dismissable onClose={onClose} fixed size="small" visible={visible}>
      <Modal.Header icon="check" closable />
      <Modal.Body>
        <Modal.Message>
          {intl.get('components.tx_guide.messages.confirmed')}
        </Modal.Message>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={toDashboard}>
          {intl.get('actions.dashboard')}
        </Button>
        <a href={successLink}>
          <Button type="primary">{buttonText}</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

const TransactionWalkthrough = props => {
  const {
    visible,
    stage,
    onClose,
    onConfirm,
    toDashboard,
    pendingReceiptText,
    pendingWalletText,
    transaction,
    successLink,
    errorText
  } = props;

  return (
    <React.Fragment>
      <InitiateWalkthrough
        onConfirm={onConfirm}
        visible={visible && stage === 'initiatePrompt'}
        onClose={onClose}
      />
      <PendingWalletConfirm
        text={pendingWalletText}
        visible={visible && stage === 'pendingWalletConfirm'}
        onClose={onClose}
      />
      <PendingReceipt
        text={pendingReceiptText}
        visible={
          visible && !transaction.completed && stage === 'pendingReceipt'
        }
        onClose={onClose}
        toDashboard={toDashboard}
      />
      <WalkthroughSuccess
        visible={visible && transaction.completed && stage === 'pendingReceipt'}
        toDashboard={toDashboard}
        buttonText={transaction.linkText}
        successLink={successLink}
        onClose={onClose}
      />
      <WalkthroughError
        onClose={onClose}
        visible={visible && stage === 'error'}
        errorText={errorText}
      />
    </React.Fragment>
  );
};

TransactionWalkthrough.propTypes = {
  visible: PropTypes.bool,
  stage: PropTypes.oneOf([
    'initiatePrompt',
    'pendingWalletConfirm',
    'pendingReceipt',
    'error'
  ]),
  onClose: PropTypes.func,
  onDismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  toDashboard: PropTypes.func,
  pendingReceiptText: PropTypes.string,
  pendingWalletText: PropTypes.string,
  errorText: PropTypes.string
};

TransactionWalkthrough.defaultProps = {
  pendingReceiptText: intl.get('components.tx_guide.messages.pending_receipt'),
  pendingWalletText: intl.get('components.tx_guide.messages.pending_wallet')
};

export default TransactionWalkthrough;
