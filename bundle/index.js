import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import store from '../lib/redux/store';

import Main from '../views/main';

render(<Provider store={store}><Main /></Provider>, document.getElementById('root'));