import { Router } from 'express';
import { appRouter as taskRouter } from './taskRoutes.ts';

const router = Router();

// API root — respond to GET /api
router.get('/api', (_req, res) => {
    res.json({
        message: 'API root',
        endpoints: ['/api/tasks']
    });
});

// Mount route modules
router.use(taskRouter);

export default router;
export { router };
