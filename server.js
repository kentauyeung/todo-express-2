const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let dbConnectionString = process.env.DB_STRING


MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('todo-list')

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        app.get('/', (req, res) => {
            db.collection('tasks').find().toArray()
                .then(results => {
                    res.render('index.ejs', { tasks: results})
                })
                .catch(error => console.error(error))
            
        })
        
        app.post('/addTask', (req, res) => {
            db.collection('tasks').insertOne({task: req.body.task, completed: false})
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        // app.put('/completed', (req, res) => {
        //     db.collection('tasks').updateOne({task: req.body.task, completed: req.body.like}, {
        //         $set: {
        //             like: req.body.like + 1
        //         }
        //     }, {
        //         sort: {_id: -1},
        //         upsert: true
        //     })
        //     .then(result => {
        //         console.log('Added Like')
        //         res.json('Like Added')
        //     })
        //     .catch(error => console.error(error))
        // })

        app.delete('/deleteTask', (req, res) => {
            db.collection('tasks').deleteOne({ task: req.body.task})
            .then(result => {
                console.log('Deleted task')
                res.json('Task deleted...')
            })
            .catch(error => console.error(error))
        })
        
    })

// app.set('view engine', 'ejs')
// app.use(express.static('public'))

// app.use(express.json())


// app.delete('/deleteTask', (req, res => {
//     db.collection('rapper').deleteOne({})
// }))

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})