import { CollectionOf, Description, Property, Required } from '@tsed/schema';
import { QuizPage } from './quizPage';

export class QuizToFill {
  @Property()
  @Required()
  questionaireId: string;

  @Property()
  @Required()
  @Description('same as questionaire name')
  name: string;

  @Property()
  totalPages: number;

  @Property()
  gotoPage: number;

  @Property()
  gotoGroup: number;

  @Property()
  @Required()
  @CollectionOf(QuizPage)
  @Description('set of possible answers/options')
  pages: QuizPage[];
}
