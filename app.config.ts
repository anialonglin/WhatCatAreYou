import 'dotenv/config';
import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'WhatCatAreYou',
  slug: 'WhatCatAreYou',
  version: '1.0.0',
  orientation: 'portrait',
  extra: {
    catApiUrl: process.env.CAT_API_URL,
  },
};

export default config;
