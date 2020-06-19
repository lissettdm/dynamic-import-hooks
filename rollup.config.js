import path from 'path';
import babel from "@rollup/plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import pck from './package.json';

const outputDir = "../lib/";

const getPluginsConfig = (prod) => {
  const plugins = [
    //resolve(),
    babel({
      exclude: "node_modules/**",
    }),
    terser()
  ];

  return plugins;
};

export default (CLIArgs) => {
  const prod = !!CLIArgs.prod;
  const mini = !!CLIArgs.mini;
  const bundle = {
    input: ["index.js"],
    output: [
      {
        file: path.resolve(__dirname,"./lib/index.js"),
      },
    ],
  };
  bundle.plugins = getPluginsConfig(prod, mini);
  bundle.external = pck.peerDependencies;
  return bundle;
};
