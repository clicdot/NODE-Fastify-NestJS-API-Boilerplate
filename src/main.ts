import * as daemonix from 'daemonix';
import { DaemonixBootstrap } from './daemonix-app';
import { bootstrap } from './dev.bootstrap';

if (process.env.MODE === 'LOCAL') {
  bootstrap();
} else {
  daemonix({
    app: DaemonixBootstrap
  });
}
