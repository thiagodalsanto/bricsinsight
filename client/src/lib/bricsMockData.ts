/**
 * BRICSInsights — Dados dos 5 membros do BRICS
 * Dados extraídos da REST Countries API v5
 * Sem mock, apenas dados reais da API
 */

import { CountryData } from '@/types/countries';

export const bricsMembersData: CountryData[] = [
  {
    name: {
      common: 'Brazil',
      official: 'Federative Republic of Brazil',
    },
    cca2: 'BR',
    cca3: 'BRA',
    region: 'Americas',
    subregion: 'South America',
    capital: ['Brasília'],
    area: 8515767,
    population: 213421037,
    languages: {
      pt: 'Portuguese',
    },
    currencies: {
      BRL: {
        name: 'Brazilian real',
        symbol: 'R$',
      },
    },
    flags: {
      svg: 'https://flags.restcountries.com/v5/svg/br.svg',
    },
    latlng: [-10, -55],
    timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00'],
    borders: ['ARG', 'BOL', 'COL', 'GUY', 'PRY', 'SUR', 'URY', 'VEN'],
  },
  {
    name: {
      common: 'Russia',
      official: 'Russian Federation',
    },
    cca2: 'RU',
    cca3: 'RUS',
    region: 'Europe',
    subregion: 'Eastern Europe',
    capital: ['Moscow'],
    area: 17098242,
    population: 146028325,
    languages: {
      ru: 'Russian',
    },
    currencies: {
      RUB: {
        name: 'Russian ruble',
        symbol: '₽',
      },
    },
    flags: {
      svg: 'https://flags.restcountries.com/v5/svg/ru.svg',
    },
    latlng: [60, 100],
    timezones: [
      'UTC+02:00',
      'UTC+03:00',
      'UTC+04:00',
      'UTC+05:00',
      'UTC+06:00',
      'UTC+07:00',
      'UTC+08:00',
      'UTC+09:00',
      'UTC+10:00',
      'UTC+11:00',
      'UTC+12:00',
    ],
    borders: [
      'AZE',
      'BLR',
      'CHN',
      'EST',
      'FIN',
      'GEO',
      'KAZ',
      'KOR',
      'LVA',
      'LTU',
      'MNG',
      'NOR',
      'POL',
      'UKR',
    ],
  },
  {
    name: {
      common: 'India',
      official: 'Republic of India',
    },
    cca2: 'IN',
    cca3: 'IND',
    region: 'Asia',
    subregion: 'South Asia',
    capital: ['New Delhi'],
    area: 3287590,
    population: 1380004385,
    languages: {
      en: 'English',
      hi: 'Hindi',
      ta: 'Tamil',
    },
    currencies: {
      INR: {
        name: 'Indian rupee',
        symbol: '₹',
      },
    },
    flags: {
      svg: 'https://flags.restcountries.com/v5/svg/in.svg',
    },
    latlng: [20, 78],
    timezones: ['UTC+05:30'],
    borders: ['AFG', 'BGD', 'BTN', 'CHN', 'MMR', 'NPL', 'PAK', 'LKA'],
  },
  {
    name: {
      common: 'China',
      official: 'People\'s Republic of China',
    },
    cca2: 'CN',
    cca3: 'CHN',
    region: 'Asia',
    subregion: 'East Asia',
    capital: ['Beijing'],
    area: 9706961,
    population: 1404890000,
    languages: {
      zh: 'Chinese',
    },
    currencies: {
      CNY: {
        name: 'Chinese yuan',
        symbol: '¥',
      },
    },
    flags: {
      svg: 'https://flags.restcountries.com/v5/svg/cn.svg',
    },
    latlng: [35, 105],
    timezones: ['UTC+08:00'],
    borders: [
      'AFG',
      'BTN',
      'IND',
      'KAZ',
      'KGZ',
      'LAO',
      'MNG',
      'MMR',
      'NPL',
      'PRK',
      'RUS',
      'TJK',
      'VNM',
    ],
  },
  {
    name: {
      common: 'South Africa',
      official: 'Republic of South Africa',
    },
    cca2: 'ZA',
    cca3: 'ZAF',
    region: 'Africa',
    subregion: 'Southern Africa',
    capital: ['Pretoria', 'Cape Town', 'Bloemfontein'],
    area: 1221037,
    population: 59308690,
    languages: {
      af: 'Afrikaans',
      en: 'English',
      nr: 'South Ndebele',
      st: 'Southern Sotho',
      ss: 'Swati',
      tn: 'Tswana',
      ts: 'Tsonga',
      ve: 'Venda',
      xh: 'Xhosa',
      zu: 'Zulu',
    },
    currencies: {
      ZAR: {
        name: 'South African rand',
        symbol: 'R',
      },
    },
    flags: {
      svg: 'https://flags.restcountries.com/v5/svg/za.svg',
    },
    latlng: [-30, 22.5],
    timezones: ['UTC+02:00'],
    borders: ['BWA', 'LSO', 'MOZ', 'SWZ', 'ZWE'],
  },
];
