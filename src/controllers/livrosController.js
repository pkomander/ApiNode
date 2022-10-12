import livros from "../models/Livro.js";

class LivroController{
    static listarLivros = (req, res) => {
        //buscando todos os livros no banco de dados
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
            res.status(200).json(livros);
        });
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
            if(err){
                res.status(400).send({message: `${err} - Id do livro nao localizado.`})
            }
            else{
                res.status(200).send(livros);
            }
        })
    }

    static cadastrarLivro = (req, res) => {
        //criando um livro baseado no conteudo enviado no body do postman
        let livro = new livros(req.body);

        livro.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            }
            else{
                res.status(201).send(livro.toJSON());//retorno o livro criado no postman
            }
        });
    }

    static AtualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Livro atualiazdo com sucesso!"})
            }
            else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static ExcluirLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Livro removido com sucesso"});
            }
            else{
                res.status(500).send({message: err.message})
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        //recebendo valor por queryParams no postman
        const editora = req.query.editora;

        livros.find({'editora': editora}, {},(err, livros) => {
            res.status(200).send(livros);
        })
    }
}

export default LivroController;