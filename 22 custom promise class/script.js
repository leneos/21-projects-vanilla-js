// Реализуйте класс MyPromise, который будет работать точно так же, как и Promise.
// Достаточно реализовать методы: then, catch, finally
// Методы all, race делать не нужно

class MyPromise {
  constructor(callback) {
    this.onCatch = null;
    this.onFinally = null;
    this.thenCbs = [];
    this.isRejected = false;
    function resolver(data) {
      if (this.isRejected) {
        return;
      }
      this.thenCbs.forEach((cb) => {
        data = cb(data);
      });
      if (this.onFinally) {
        this.onFinally();
      }
    }

    function rejecter(error) {
      this.isRejected = true;
      if (this.onCatch) {
        this.onCatch(error);
      }
      if (this.onFinally) {
        this.onFinally();
      }
    }

    callback(resolver.bind(this), rejecter.bind(this));
  }
  then(cb) {
    this.thenCbs.push(cb);
    return this;
  }
  catch(cb) {
    this.onCatch = cb;
    return this;
  }
  finally(cb) {
    this.onFinally = cb;
    return this;
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Some error");
    resolve(10);
  }, 1000);
});
promise
  .then((num) => num * 2)
  .catch((err) => console.error(err))
  .then((num) => num * 3)
  .finally(() => console.log("finally"))
  .then((num) => console.log("done", num));
