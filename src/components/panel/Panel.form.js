import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';
import PanelEditConditional from './editForm/Panel.edit.conditional';
import PanelLayoutConditional from './editForm/Panel.edit.layout';
import PanelApiConditional from './editForm/Panel.edit.api';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: PanelEditDisplay
    },
    {
      key: 'conditional',
      components: PanelEditConditional,
    },
    {
      key: 'api',
      components: PanelApiConditional,
      ignore: true
    },
    {
      key: 'layout',
      components: PanelLayoutConditional,
    },
    {
      key: 'logic',
      ignore: true
    },
  ], ...extend);
}
