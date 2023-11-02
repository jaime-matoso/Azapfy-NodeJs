import axios from 'axios';
import { Request, Response } from "express";
import { formatDate } from '../common/functions'

class NotasController {

    async GetNotas(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }
    }

    async GetNotasAgrupadasPorRemetente(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;

            const notasAgupradas: { [key: string]: any[] } = {}
            data.forEach((nota: any) => {
                const nome_remete = nota.nome_remete;
                if (!notasAgupradas[nome_remete]) {
                    notasAgupradas[nome_remete] = [];
                }
                notasAgupradas[nome_remete].push(nota);
            });
            res.status(200).json(notasAgupradas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }
    };



    async GetTotalNotasPorRemetente(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;

            const remetentes: { [key: string]: number } = {};
            data.forEach((nota: any) => {
                const nome_remete = nota.nome_remete;
                const valor = Number(nota.valor);

                if (remetentes[nome_remete]) {
                    remetentes[nome_remete] += valor;
                }
                else {
                    remetentes[nome_remete] = valor;
                }
            });
            res.status(200).json(remetentes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }

    }


    async GetValorNotasEntregaPendente(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;
            const notasPendentes = data.filter((nota: any) => nota.status != "COMPROVADO");
            const remetentes: { [key: string]: number } = {};
            notasPendentes.forEach((nota: any) => {
                const nome_remete = nota.nome_remete;
                const valor = Number(nota.valor);

                if (remetentes[nome_remete]) {
                    remetentes[nome_remete] += valor;
                } else {
                    remetentes[nome_remete] = valor;
                }
            });
            res.status(200).json(remetentes);;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }

    }

    async GetValorNotasComEntregaAtrasada(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;
            const notasAtrasadas = data.filter((nota: any) => {
                let newDataEmissao = formatDate(nota.dt_emis);
                let newDataEntrega = formatDate(nota.dt_entrega);
                newDataEmissao?.setDate(newDataEmissao.getDate() + 2);
                return (nota.status === "COMPROVADO" && newDataEntrega != null && newDataEntrega > newDataEmissao);
            });
            const remetentes: { [key: string]: number } = {};
            notasAtrasadas.forEach((nota: any) => {
                const nome_remete = nota.nome_remete;
                const valor = Number(nota.valor);
                if (remetentes[nome_remete]) {
                    remetentes[nome_remete] += valor;
                } else {
                    remetentes[nome_remete] = valor;
                }
            });
            res.status(200).json(remetentes);;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }

    }


    async GetValorNotasEntregue(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;
            // Para o remetente receber por um produto, é necessário que o documento esteja entregue (status comprovado) 
            // e que a entrega tenha sido feita em no máximo dois dias após a sua data de emissão
            const notasEntregues = data.filter((nota: any) => {
                let newDataEmissao = formatDate(nota.dt_emis);
                let newDataEntrega = formatDate(nota.dt_entrega);
                newDataEmissao?.setDate(newDataEmissao.getDate() + 2);
                return (nota.status === "COMPROVADO" && newDataEntrega != null && newDataEntrega <= newDataEmissao);
            });
            const remetentes: { [key: string]: number } = {};
            notasEntregues.forEach((nota: any) => {
                const nome_remete = nota.nome_remete;
                const valor = Number(nota.valor);

                if (remetentes[nome_remete]) {
                    remetentes[nome_remete] += valor;
                } else {
                    remetentes[nome_remete] = valor;
                }
            });
            res.status(200).json(remetentes);;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }
    }

    async GetAllNotaPorRemetente(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/notas');
            const data = response.data;
            const notas = data.filter((nota: any) => nota.cnpj_remete == req.params.parametro);
            res.status(200).json(notas);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }
    }
}

export default new NotasController();
