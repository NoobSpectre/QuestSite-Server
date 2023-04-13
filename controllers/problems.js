import Problem from '../models/Problem.js';
import User from '../models/User.js';

/* Get all problems */
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ pid: 1 });
    res.json({ success: true, message: 'Received successfully!', problems });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* post wrong answer */
const postWrongAnswer = async (username, pid) => {
  try {
    const { problems } = await User.findOne({ username });
    const isTouchedByUser = problems.find(pb => pb.pid === pid);
    if (!isTouchedByUser) {
      await Problem.findOneAndUpdate(
        { pid },
        { $inc: { submissions: 1 } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { username },
        {
          $push: { problems: { pid, status: 'Attempted' } },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* post correct answer */
const postCorrectAnswer = async (username, pid) => {
  try {
    const { problems } = await User.findOne({ username });
    const isTouchedByUser = problems.find(pb => pb.pid === pid);
    if (!isTouchedByUser) {
      const pb = await Problem.findOneAndUpdate(
        { pid },
        { $inc: { submissions: 1, accepted: 1 } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { username },
        {
          $push: {
            problems: { pid, status: 'Solved', difficulty: pb.difficulty },
          },
          $inc: { total_solved: 1 },
        },
        { new: true }
      );
    } else if (isTouchedByUser.status === 'Attempted') {
      const pb = await Problem.findOneAndUpdate(
        { pid },
        { $inc: { accepted: 1 } },
        { new: true }
      );
      await User.findOneAndUpdate(
        {
          username,
          problems: { $elemMatch: { pid } },
        },
        {
          $set: {
            'problems.$': { pid, status: 'Solved', difficulty: pb.difficulty },
          },
          $inc: { total_solved: 1 },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Check Answer */
export const postAnswer = async (req, res) => {
  try {
    const { pid } = req.params;
    const { username, userAnswer } = req.body;
    const { answer } = await Problem.findOne({ pid });

    if (answer !== userAnswer) {
      postWrongAnswer(username, Number(pid));
      return res.status(201).json({
        success: true,
        message: 'wrong',
      });
    }

    postCorrectAnswer(username, Number(pid));
    res.status(201).json({
      success: true,
      message: 'correct',
    });
  } catch (error) {}
};

export const getProblem = async (req, res) => {
  try {
    const { pid } = req.params;
    const problem = await Problem.findOne({ pid });
    if (!problem) throw new Error('No such problem found!');

    res.status(200).json({
      success: true,
      message: 'Good luck with the problem!',
      problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProblemDiscussions = async (req, res) => {
  try {
    const { pid } = req.params;
    const problem = await Problem.findOne({ pid });
    if (!problem) throw new Error('No such problem found!');

    res.status(200).json({
      success: true,
      message: `Here are the discussions of the question ${pid}`,
      discussions: problem.discussions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const patchDiscussion = async (req, res) => {
  try {
    const { pid } = req.params;
    const { username, comment } = req.body;

    await Problem.findOneAndUpdate(
      { pid },
      { $push: { discussions: { comment, by: username } } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { username },
      { $inc: { total_discussions: 1 } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
