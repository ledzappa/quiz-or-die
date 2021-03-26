import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Category, Settings as ISettings } from '../../interfaces/interfaces';

export default function Settings({
  categories,
  showModal,
  settings,
  setCategories,
  setShowModal,
  setSettings,
}: {
  categories: Category[];
  showModal: boolean;
  settings: ISettings;
  setShowModal: Function;
  setCategories: Function;
  setSettings: Function;
}) {
  const [miniGames, setMiniGames] = useState([
    { id: 'roundAndRound', name: 'Round and Round' },
    { id: 'triggerFinger', name: 'Trigger Finger' },
    { id: 'closestWins', name: 'Closest Wins' },
  ]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCategoryChange = ({ target: { checked, name } }: any) => {
    const _categories = categories.map((category) =>
      category.id === Number(name)
        ? { ...category, disabled: !checked }
        : category
    );
    setCategories(_categories);
  };

  const handleMiniGameChange = ({ target: { checked, name } }: any) => {
    setSettings({
      ...settings,
      enabledMiniGames: checked
        ? [...settings.enabledMiniGames, name]
        : settings.enabledMiniGames.filter((id) => id !== name),
    });
  };

  const handlePoliticallyCorrectClick = () => {
    setSettings({
      ...settings,
      politicallyCorrect: !settings.politicallyCorrect,
    });
  };

  const handlePointsToWinChange = ({ target: { value } }: any) => {
    setSettings({
      ...settings,
      pointsToWin: Number(value),
    });
  };

  return (
    <Modal className="text-dark" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <h4>Points to Win</h4>
          <p>Points required to win the game.</p>
          <select
            className="form-control"
            value={settings.pointsToWin}
            onChange={handlePointsToWinChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="form-group">
          <h4>Enabled Categories</h4>
          {categories.map((category, idx) => (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                name={category.id.toString()}
                checked={!category.disabled}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label">{category.name}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <h4>Enabled Minigames</h4>
          {miniGames.map((miniGame, idx) => (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                name={miniGame.id}
                checked={settings.enabledMiniGames.includes(miniGame.id)}
                onChange={handleMiniGameChange}
              />
              <label className="form-check-label">{miniGame.name}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <h4>Politically correct mode</h4>
          <p>
            When activated, R-rated words (such as f***ing) are removed from
            player descriptions, and adult oriented questions (such as "What was
            Ron Jeremys signature trait?") are removed.
          </p>
          <button
            className={
              'btn btn-' +
              (settings.politicallyCorrect ? 'success' : 'secondary')
            }
            onClick={handlePoliticallyCorrectClick}
          >
            {settings.politicallyCorrect ? 'ON' : 'OFF'}
          </button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
