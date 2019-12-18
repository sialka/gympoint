import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpController from './app/controllers/StudentHelpController';

const routes = new Router();

// Autenticação Admin
routes.post('/users', UserController.store);

// Check-in Aluno
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

// Pedidos de Auxilio - Academia: Pedidos sem respostas e Responder
routes.get('/students/help-orders', authMiddleware, HelpOrderController.index);
routes.post(
  '/students/help-orders/:id/answer',
  authMiddleware,
  StudentHelpController.store
);

// Pedidos de Auxilio - Aluno: Listagem por Id e Fazer pedido
routes.get('/students/:id/help-orders', StudentHelpController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

// Habilitando authMiddleware requerer token de autenticação
routes.use(authMiddleware);

// Rotas para tabela Student
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Rotas para tabela Plan
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Rotas para tabela Enrollment
routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

export default routes;
