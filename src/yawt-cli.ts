import { type YawtTaskNames, yawt } from './yawt';
import { argv2Object } from './utils/argv-2-object';

const cliParams = argv2Object<{
  task: YawtTaskNames;
  workers: number;
  silent: boolean;
  single: boolean;
  npmRegistryURL: string;
  npmPublicPublish: boolean;
  npmNamespace: string;
  publish: boolean;
}>(process.argv.slice(2));

yawt({
  task: cliParams.task,
  workers: cliParams.workers || parseInt(process.env.YAWT_WORKER_THREADS || '8', 10),
  silent: cliParams.silent || process.env.YAWT_SILENT === 'true',
  single: cliParams.single || process.env.YAWT_SINGLE === 'true',
  npmRegistryURL: cliParams.npmRegistryURL || process.env.YAWT_NPM_PUSH_REGISTRY,
  npmPublicPublish: cliParams.npmPublicPublish || process.env.YAWT_NPM_PUBLIC_PUBLISH === 'true',
  npmNamespace: cliParams.npmNamespace || process.env.YAWT_NPM_NAMESPACE,
})
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });