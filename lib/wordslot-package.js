'use babel';

import WordslotPackageView from './wordslot-package-view';
import { CompositeDisposable } from 'atom';

export default {

  wordslotPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wordslotPackageView = new WordslotPackageView(state.wordslotPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wordslotPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wordslot-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wordslotPackageView.destroy();
  },

  serialize() {
    return {
      wordslotPackageViewState: this.wordslotPackageView.serialize()
    };
  },

  toggle() {
    console.log('WordslotPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
