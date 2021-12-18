import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(()=>{
    component = new VoteComponent();
  })

  it('Should increment totalVotes when upvoted', () => {
    component.upVote();
    expect(component.totalVotes).toBe(1);

  });

  it('Should decrement totalVotes when downvotes', () => {
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });


});
