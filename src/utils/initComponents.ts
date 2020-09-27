import * as Components from '../components/index';
import * as Pages from '../pages/index';

export function initComponents() {
  // register components
  templator.registry.register('App', Components.App);
  templator.registry.register('Button', Components.Button);
  templator.registry.register('Link', Components.Link);
  templator.registry.register('LeftPanel', Components.LeftPanel);
  templator.registry.register('LeftPanelMenu', Components.LeftPanelMenu);
  templator.registry.register('DialogsList', Components.DialogsList);
  templator.registry.register('LoadingIndicator', Components.LoadingIndicator);
  templator.registry.register('DialogListItem', Components.DialogListItem);
  templator.registry.register('ChatPanel', Components.ChatPanel);
  templator.registry.register('Message', Components.Message);
  templator.registry.register('SearchInput', Components.SearchInput);
  templator.registry.register('InputField', Components.InputField);
  templator.registry.register('ProfileForm', Components.ProfileForm);
  templator.registry.register('LoginForm', Components.LoginForm);
  templator.registry.register('RegistrationForm', Components.RegistrationForm);
  templator.registry.register('Avatar', Components.Avatar);

  // register pages
  templator.registry.register('Login', Pages.Login);
  templator.registry.register('Registration', Pages.Registration);
  templator.registry.register('Profile', Pages.Profile);
  templator.registry.register('ErrorPage', Pages.ErrorPage);
}
