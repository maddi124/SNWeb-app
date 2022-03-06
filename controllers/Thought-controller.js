const {Thought, User} = require('../models');

const thoughtController = {

getAllThought(req,res) {
    Thought.find({})
    .select('-__v')
     .sort({_id:-1})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
    res.status(400).json(err);
    })
},

getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .sort({_id:-1})
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
},
    
createThought({params, body },res) {
    console.log(params);
    Thought.create(body)
        .then(({ _id}) => { 
            return User.findByIdAndUpdate(
                {_id: body.UserId},
                {$push: {thoughts: _id}},
                {new:true}
            );
       })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
        })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
},

updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData  => {
        if (!dbThoughtData ) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData );
      })
      .catch(err => res.status(400).json(err));
},

deleteThought({ params },res) {
    Thought.findOneAndDelete({_id:params.id})
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughtfound with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

addReaction({ params,body },res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

removeReaction({params},res) {
    Thought.findByIdAndUpdate(
        {_id:params.thoughtId},
        {$pull:{reactions:{reactionId:params.reactionId}}},
        {new:true}
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
}
};
module.exports = thoughtController;