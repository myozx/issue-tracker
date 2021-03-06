import React from 'react';
import Toast from './Toast.jsx';

export default function withToast(OriginalComponent) {
  /**
   * Wraps the OriginalComponent with a Toast.
   * Holds the required logic for the Toast component
   */
  return class ToastWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toastVisible: false,
        toastMessage: '',
        toastType: 'success',
      };
      this.showError = this.showError.bind(this);
      this.showSuccess = this.showSuccess.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }

    showSuccess(message) {
      this.setState({
        toastVisible: true,
        toastMessage: message,
        toastType: 'success',
      });
    }

    showError(message) {
      this.setState({
        toastVisible: true,
        toastMessage: message,
        toastType: 'danger',
      });
    }

    dismissToast() {
      this.setState({ toastVisible: false });
    }

    render() {
      const { toastType, toastMessage, toastVisible } = this.state;
      return (
        <React.Fragment>
          <OriginalComponent
            showError={this.showError}
            showSuccess={this.showSuccess}
            {...this.props}
          />
          <Toast
            bsStyle={toastType}
            showing={toastVisible}
            onDismiss={this.dismissToast}
          >
            {toastMessage}
          </Toast>
        </React.Fragment>
      );
    }
  };
}
