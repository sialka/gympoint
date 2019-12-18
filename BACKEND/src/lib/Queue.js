/**
 * Serviço E-mail por Fila
 */

import Bee from 'bee-queue';
import WellcomeMail from '../app/jobs/WellcomeMail';
import HelpOrderMail from '../app/jobs/HelpOrderMail';

import redisConfig from '../config/redis';

const jobs = [WellcomeMail, HelpOrderMail];

/**
 * Responsavel pelo filas e tarefas
 */
class Queue {
  constructor() {
    // Armazena tarefas ou jobs (e-mails)
    this.queues = {};

    this.init();
  }

  /**
   * Configurando e inicializando as filas.
   */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    // Exemplo: this.queues[CancellationMail]
    // .createJob(job).save() => coloca o tarefa na fila.
    return this.queues[queue].bee.createJob(job).save();
  }

  // Executa as tarefas das filas
  processQueue() {
    jobs.forEach(job => {
      // setando a fila
      const { bee, handle } = this.queues[job.key];
      // Executando as tarefas da fila.
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  // Trata erro na execução de tarefas
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
