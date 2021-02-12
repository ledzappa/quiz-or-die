import { Player } from '../../../interfaces/interfaces';
import Perks from '../../perks/Perks';
import { setNextTurn, reducePlayerPerks } from '../Scoreboard';

describe('Scoreboard', () => {
  let playerMock: Player;

  beforeEach(() => {
    playerMock = {
      name: 'string',
      description: 'string',
      perks: {
        freedomOfChoice: 0,
        doubleUp: 0,
        landmine: 0,
      },
      isPlayersTurn: false,
      points: 0,
    };
  });

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

  describe('reducePlayerPerks', () => {
    test('should reduce current players perks by one if more than 0', () => {
      const mockWithPerks = {
        ...playerMock,
        perks: { freedomOfChoice: 3, doubleUp: 1, landmine: 0 },
      };
      const input = [
        {
          ...mockWithPerks,
          name: 'player1',
          isPlayersTurn: false,
        },
        {
          ...mockWithPerks,
          name: 'player2',
          isPlayersTurn: true,
        },
        {
          ...mockWithPerks,
          name: 'player3',
          isPlayersTurn: false,
        },
      ];

      const output = reducePlayerPerks(input);
      expect(output[0].perks.freedomOfChoice).toBe(3);
      expect(output[0].perks.doubleUp).toBe(1);
      expect(output[0].perks.landmine).toBe(0);
      expect(output[1].perks.freedomOfChoice).toBe(2);
      expect(output[1].perks.doubleUp).toBe(0);
      expect(output[1].perks.landmine).toBe(0);
      expect(output[2].perks.freedomOfChoice).toBe(3);
      expect(output[2].perks.doubleUp).toBe(1);
      expect(output[2].perks.landmine).toBe(0);
    });
  });
});
