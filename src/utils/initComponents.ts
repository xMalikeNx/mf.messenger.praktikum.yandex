import * as Components from '../components/index';
import { Component } from '../core/Component';
import { MNTemplator } from '../core/templator/Templator';
import * as Pages from '../pages/index';

export function initComponents(): void {
  const templator = MNTemplator.getInstance();
  // register components
  templator.registry.register('App', Components.App as typeof Component);
  templator.registry.register(
    'Notification',
    Components.Notification as typeof Component
  );
  templator.registry.register('Button', Components.Button as typeof Component);
  templator.registry.register('Link', Components.Link as typeof Component);
  templator.registry.register(
    'LeftPanel',
    Components.LeftPanel as typeof Component
  );
  templator.registry.register(
    'LeftPanelMenu',
    Components.LeftPanelMenu as typeof Component
  );
  templator.registry.register(
    'DialogsList',
    Components.DialogsList as typeof Component
  );
  templator.registry.register(
    'LoadingIndicator',
    Components.LoadingIndicator as typeof Component
  );
  templator.registry.register(
    'DialogListItem',
    Components.DialogListItem as typeof Component
  );
  templator.registry.register(
    'ChatPanel',
    Components.ChatPanel as typeof Component
  );
  templator.registry.register(
    'Message',
    Components.Message as typeof Component
  );
  templator.registry.register(
    'SearchInput',
    Components.SearchInput as typeof Component
  );
  templator.registry.register(
    'InputField',
    Components.InputField as typeof Component
  );
  templator.registry.register(
    'ProfileForm',
    Components.ProfileForm as typeof Component
  );
  templator.registry.register(
    'LoginForm',
    Components.LoginForm as typeof Component
  );
  templator.registry.register(
    'RegistrationForm',
    Components.RegistrationForm as typeof Component
  );
  templator.registry.register('Avatar', Components.Avatar as typeof Component);

  // register pages
  templator.registry.register('Login', Pages.Login as typeof Component);
  templator.registry.register(
    'Registration',
    Pages.Registration as typeof Component
  );
  templator.registry.register('Profile', Pages.Profile as typeof Component);
  templator.registry.register('ErrorPage', Pages.ErrorPage as typeof Component);
}
