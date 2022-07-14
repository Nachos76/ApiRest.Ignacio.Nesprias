import { Injectable } from '@angular/core';
import { ThemeMode } from '../models/theme.enum';
import { IPalette, IVariantPalette, OptionPalette, Theme, VariantPaletteProperties } from '../models/theme.model';

const PALETTE : IPalette = {
  primary:{
    default: '#337a76',
    '_50':  '#e7efef',
    '_100': '#c2d7d6',
    '_200': '#99bdbb',
    '_300': '#70a29f',
    '_400': '#528e8b',
    '_500': '#337a76',
    '_600': '#2e726e',
    '_700': '#276763',
    '_800': '#205d59',
    '_900': '#144a46',
    'A100':   '#86fff5',
    'A200':   '#53fff1',
    'A400':   '#20ffec',
    'A700':   '#07ffea',
    contrast : {
      default: '#337a76',
      '_50': '#000000de',
      '_100': '#000000de',
      '_200': '#000000de',
      '_300': '#000000de',
      '_400': '#000000de',
      '_500': 'white',
      '_600': 'white',
      '_700': 'white',
      '_800': 'white',
      '_900': 'white',
      'A100': '#000000de',
      'A200': '#000000de',
      'A400': '#000000de',
      'A700': '#000000de'
    }
  },
  secondary:{
    default: '#96923e',
    '_50': '#f2f2e8',
    '_100': '#e0dec5',
    '_200': '#cbc99f',
    '_300': '#b6b378',
    '_400': '#a6a25b',
    '_500': '#96923e',
    '_600': '#8e8a38',
    '_700': '#837f30',
    '_800': '#797528',
    '_900': '#68631b',
    'A100': '#fff9a4',
    'A200': '#fff571',
    'A400': '#fff23e',
    'A700': '#fff025',
    contrast : {
      default: '#96923e',
      '_50': '#000000de',
      '_100': '#000000de',
      '_200': '#000000de',
      '_300': '#000000de',
      '_400': '#000000de',
      '_500': 'white',
      '_600': 'white',
      '_700': 'white',
      '_800': 'white',
      '_900': 'white',
      'A100': '#000000de',
      'A200': '#000000de',
      'A400': '#000000de',
      'A700': '#000000de'
    }
  },
  danger: {
    default: '#963e42',
    '_50': '#f2e8e8',
    '_100': '#e0c5c6',
    '_200': '#cb9fa1',
    '_300': '#b6787b',
    '_400': '#a65b5e',
    '_500': '#963e42',
    '_600': '#8e383c',
    '_700': '#833033',
    '_800': '#79282b',
    '_900': '#681b1d',
    'A100': '#ffa4a7',
    'A200': '#ff7175',
    'A400': '#ff3e43',
    'A700': '#ff252b',
    contrast: {
      default: 'white',
      '_50': '#000000de',
      '_100': '#000000de',
      '_200': '#000000de',
      '_300': '#000000de',
      '_400': '#000000de',
      '_500': 'white',
      '_600': 'white',
      '_700': 'white',
      '_800': 'white',
      '_900': 'white',
      'A100': '#000000de',
      'A200': '#000000de',
      'A400': '#000000de',
      'A700': '#000000de'
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme = new Theme(PALETTE);

  constructor() {
  }

  getCurrentTheme(){
    return this.currentTheme
  }

  public loadTheme(): void {
    this.setPaletteColorsCSS(this.currentTheme.palette);
    document.body.classList.add(this.currentTheme.themeMode);
  }

  changeThemeMode(themeMode: ThemeMode, oldThemeMode: ThemeMode){
    this.currentTheme.setThemeMode(themeMode);
    document.body.classList.add(themeMode);
    localStorage.setItem('themeMode', themeMode);
    if(oldThemeMode) document.body.classList.remove(oldThemeMode);
  }

  private setPaletteColorsCSS(palette: IPalette): void {
    for (const key in palette) {
      if (Object.prototype.hasOwnProperty.call(palette, key)) {
        const parseKey = key as OptionPalette;
        this.setCSSVariables(key, palette[parseKey]);
      }
    }
  }

  private setCSSVariables(key: string, palette: IVariantPalette) {
    for (const keyPalette in palette) {
      if (Object.prototype.hasOwnProperty.call(palette, keyPalette)) {
        if (keyPalette == 'contrast') {
          for (const keyContrast in palette.contrast) {
            if (Object.prototype.hasOwnProperty.call(palette.contrast, keyContrast)) {
              const parseKey = keyContrast as VariantPaletteProperties;
              document.documentElement.style.setProperty(
                '--theme-' + [key] + '-contrast-' + keyContrast.replace('_', ''),
                palette.contrast[parseKey]
              );
            }
          }
        } else {
          const parseKey = keyPalette as VariantPaletteProperties;
          document.documentElement.style.setProperty(
            '--theme-' + [key] + '-' + keyPalette.replace('_', ''),
            palette[parseKey]
          );
        }
      }
    }
  }
}
