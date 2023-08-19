import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { defaultPreset } from './src/unocss/presets'
import { presetExtra } from 'unocss-preset-extra';

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetExtra(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    defaultPreset
  ],
})