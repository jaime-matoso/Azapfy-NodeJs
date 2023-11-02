import express from 'express';
import notasController from '../controller/notasController';

const router = express.Router();

/**
 * @openapi
 * /api/notas:
 *   get:
 *     summary: Retorna todas as notas
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas', notasController.GetNotas);

/**
 * @openapi
 * /api/notas/agrupadas:
 *   get:
 *     summary: Retorna os dados de notas agrupadas pelo remetente
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/agrupadas', notasController.GetNotasAgrupadasPorRemetente);

/**
 * @openapi
 * /api/notas/valor/remetente:
 *   get:
 *     summary: Retorna o valor total das notas por remetente
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/valor/remetente',  notasController.GetTotalNotasPorRemetente);

/**
 * @openapi
 * /api/notas/valor/entregue:
 *   get:
 *     summary: Retorna o valor total das notas que o remetente irá receber pelo que já foi entregue
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/valor/entregue', notasController.GetValorNotasEntregue);

/**
 * @openapi
 * /api/notas/valor/entrega/pendente:
 *   get:
 *     summary: Retorna o valor total das notas que o remetente irá receber pelo que ainda não foi entregue
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/valor/entrega/pendente', notasController.GetValorNotasEntregaPendente);

/**
 * @openapi
 * /api/notas/valor/entrega/atrasada:
 *   get:
 *     summary: Retorna valor total das notas que o remetente deixou de receber devido ao atraso na entrega
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/valor/entrega/atrasada', notasController.GetValorNotasComEntregaAtrasada);

/**
 * @openapi
 * /api/notas/remetente/{parametro}:
 *   get:
 *     summary: Rota de exemplo com parâmetro
 *     parameters:
 *       - name: parametro  # Nome do parâmetro
 *         in: path        # Onde o parâmetro está localizado (no caminho)
 *         required: true  # Se o parâmetro é obrigatório
 *         schema:
 *           type: string
 *         description: O parâmetro da rota
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/api/notas/remetente/:parametro', notasController.GetAllNotaPorRemetente);


export default router;