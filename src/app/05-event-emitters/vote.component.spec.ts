import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  var component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise votechanged event when upvoted', (done) => {
    let totalVotes = null;
    component.voteChanged.subscribe(tv => {
      totalVotes = tv
      expect(totalVotes).toBe(1);
      done();
    });
    component.upVote();
  });
});
