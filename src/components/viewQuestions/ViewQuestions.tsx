import React, { useEffect, useState } from 'react';
import AddQuestion from '../addQuestion/AddQuestion';
import api from '../../api/Api';
import { Category, Question } from '../../interfaces/interfaces';

const filterQuestions = (
  questions: any,
  filterString: string,
  categoryId: number,
  image?: boolean
) => {
  return questions.filter(
    (question: any) =>
      (question?.question?.toLowerCase().includes(filterString) ||
        question?.answer?.toLowerCase().includes(filterString)) &&
      (categoryId === 0 || question?.categoryId === categoryId) &&
      image === !!question.img
  );
};

export default function ViewQuestions({
  categories,
}: {
  categories: Category[];
}) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [showOnlyImages, setShowOnlyImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined);

  useEffect(() => {
    api.getAllQuestions().then((res) => {
      setAllQuestions(res.data.questions);
      setQuestions(res.data.questions);
    });
  }, []);

  const handleInputChange = (filterString: string) => {
    setFilterString(filterString.toLowerCase());
    setQuestions(
      filterQuestions(allQuestions, filterString.toLowerCase(), categoryId, showOnlyImages)
    );
  };

  const handleSelectCategoryChange = (categoryId: string) => {
    setCategoryId(Number(categoryId));
    setQuestions(
      filterQuestions(allQuestions, filterString, Number(categoryId), showOnlyImages)
    );
  };

  const handleAddQuestionClick = () => {
    setSelectedQuestion(undefined);
    setShowModal(true);
  };

  const handleEditModalClick = (question: Question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleShowImageQuestionsCheck = ({
    target: { checked, name },
  }: any) => {
    setShowOnlyImages(checked);
    setQuestions(
      filterQuestions(allQuestions, filterString, Number(categoryId), checked)
    );
  };

  return (
    <div>
      <h1 className="mb-4">Questions</h1>
      <div className="row mb-4">
        <div className="col-12 col-sm-4">
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              onChange={(e) => handleSelectCategoryChange(e.target.value)}
            >
              <option value="0">All categories</option>
              {categories.map((category) => (
                <option value={category.id}>
                  {category.name} ({category.questions})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="form-group">
            <label>Filter term</label>
            <input
              className="form-control"
              onChange={(e) => handleInputChange(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="form-group">
            <label className="d-none d-sm-block">&nbsp;</label>
            <button
              className="btn btn-secondary w-100"
              onClick={handleAddQuestionClick}
            >
              Add Question
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={showOnlyImages}
                onChange={handleShowImageQuestionsCheck}
              />
              <label className="form-check-label">
                Show only image questions
              </label>
            </div>
          </div>
        </div>
      </div>
      <p>{questions.length} questions</p>
      {questions.length > 0 && (
        <table className="table text-white table-dark table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question: Question) => (
              <tr
                className="clickable"
                onClick={() => handleEditModalClick(question)}
              >
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>{question.tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AddQuestion
        categoryId={categoryId}
        categories={categories}
        question={selectedQuestion}
        showModal={showModal}
        setShowModal={setShowModal}
        setAllQuestions={(question: Question) => {
          const questions = [...allQuestions, question];
          setAllQuestions(questions);
        }}
      ></AddQuestion>
    </div>
  );
}
