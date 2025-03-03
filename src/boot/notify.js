import { Notify} from "quasar";
Notify.setDefaults({
  position:  'top-right',
  timeout:   7000,
  textColor: 'white',
  progress:  true,
  actions:   [ { icon: 'fas fa-times', color: 'white' } ],
});

