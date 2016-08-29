import ReactOnRails from 'react-on-rails';
import PhotoGalleryApp from './PhotoGalleryAppClient';
import appStore from '../store/appStore';

ReactOnRails.register({
  PhotoGalleryApp
});

ReactOnRails.registerStore({
  appStore
});
