export class ApiService {
  fetchDialogMessages() {
    return new Promise((resolve) => {
      fetch('/mock/messages.json')
        .then((res) => res.json())
        .then((res) => resolve(res.messages));
    });
  }

  fetchDialogs() {
    return new Promise((resolve) => {
      fetch('/mock/dialogs.json')
        .then((res) => res.json())
        .then((res) => resolve(res.dialogs));
    });
  }
}
