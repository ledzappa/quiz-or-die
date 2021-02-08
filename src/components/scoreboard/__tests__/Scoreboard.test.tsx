import { Player } from '../../../interfaces/interfaces';
import { setNextTurn } from '../Scoreboard';

describe('Scoreboard', () => {
  const playerMock: Player = {
    name: 'string',
    description: 'string',
    perks: {
      freedomOfChoice: 0,
      doubleUp: 0,
    },
    isPlayersTurn: false,
    points: 0,
  };

  describe('setNextTurn', () => {
    describe('positive direction and last players turn', () => {
      const direction = 1;
      test('should set next turn to first player', () => {
        const input = [
          {
            ...playerMock,
            name: 'player1',
            isPlayersTurn: false,
          },
          {
            ...playerMock,
            name: 'player2',
            isPlayersTurn: false,
          },
          {
            ...playerMock,
            name: 'player3',
            isPlayersTurn: true,
          },
        ];
        const output = setNextTurn(input, direction);
        expect(
          output.filter((player: Player) => player.isPlayersTurn).length
        ).toBe(1);
        expect(
          output.filter((player: Player) => player.name === 'player1')[0]
            .isPlayersTurn
        ).toBe(true);
      });
    });

    describe('negative direction', () => {
      const direction = -1;
      test('should set next turn to last player', () => {
        const input = [
          {
            ...playerMock,
            name: 'player1',
            isPlayersTurn: true,
          },
          {
            ...playerMock,
            name: 'player2',
            isPlayersTurn: false,
          },
          {
            ...playerMock,
            name: 'player3',
            isPlayersTurn: false,
          },
        ];
        const output = setNextTurn(input, direction);
        expect(
          output.filter((player: Player) => player.isPlayersTurn).length
        ).toBe(1);
        expect(
          output.filter((player: Player) => player.name === 'player3')[0]
            .isPlayersTurn
        ).toBe(true);
      });
    });
  });
});
