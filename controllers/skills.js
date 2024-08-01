//import the skills data
import { Skill} from '../models/skill.js'

//import { skills } from "../data/skill-data.js"

async function index(req, res) {
  try {
    const skills = await Skill.find({})
    res.render('skills/index', {
      skills
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function newSkill(req, res) {
  res.render('skills/new')
}

async function create(req, res) {
  try {
    req.body.learned = false
    await Skill.create(req.body)
    res.redirect('/skills')
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function show(req, res) {
  try {
    // find the skill's details
    const skill = await Skill.findById(req.params.skillId)
    res.render('skills/show', {
      skill
    })
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function deleteSkill(req, res) {
  try {
    // find the skill to delete and delete it
    await Skill.findByIdAndDelete(req.params.skillId)
    // redirect to /skills
    res.redirect('/skills')
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function edit(req, res) {
  try {
    //find the skill that needs to be edited
    const skill = await Skill.findById(req.params.skillId)
    //render the edit page with skill details
    res.render('skills/edit', {
      skill
    })
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function update(req, res) {
  try {
    req.body.learned = !!req.body.learned
    await Skill.findByIdAndUpdate(req.params.skillId, req.body, {new: true})
    res.redirect(`/skills/${req.params.skillId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}


export {
  index,
  newSkill as new,
  create,
  show,
  deleteSkill as delete,
  edit,
  update,
}