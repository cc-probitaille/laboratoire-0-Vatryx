// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import supertest from 'supertest'
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);


const testNom1 = 'Gab';
const testNom2 = 'Gabriel';

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("devrait redémarrer le jeu de dés avec succès!", async () => {
     const response = await request.get('/api/v1/jeu/redemarrerJeu').send({ nom: testNom1 });
     expect(response.status).toBe(200);
  });

  it("devrait s'assurer qu'il n'y ait plus de joueurs avant de redémarrer", async () => {
     const joueursJSON = jeuRoutes.controleurJeu.joueurs;
     const joueursArray = JSON.parse(joueursJSON);
     expect(joueursArray.length).toBe(0);
  });

  it("retourner erreur 404 jouer après redemarrerJeu", async () =>{
     const response = await request.get('/api/v1/jeu/jouer/' + testNom1);
     expect(response.status).toBe(404);
  });
});

