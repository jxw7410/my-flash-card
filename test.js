// Running snippets to test concepts at a smaller scale

const promise1 = () => (
  setTimeout(() => {
    console.log('Promise1 executed');
  }, 1000)
)

const promise2 = () => (
  new Promise((resolve, reject) => {
    console.log('Promise2 executed');
    resolve();
  })
)


const test = async () => {
  await promise1();
  promise2();
}


test();

