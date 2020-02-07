// depends on: https://unpkg.com/@isomorphic-git/lightning-fs and https://unpkg.com/isomorphic-git

//waitForMultiple(["LightningFS", "git"], () => {

window.fs = new LightningFS('fs')
git.plugins.set('fs', window.fs)
window.pfs = window.fs.promises

async function gitJsMain() {

console.log("mm")


window.dir = '/tutorial3'
console.log("mmm")
await pfs.mkdir(dir)
console.log("mmmm")
// Behold - it is empty!
await pfs.readdir(dir);

console.log("mmmmm")

await git.clone({
  dir,
  corsProxy: 'https://cors.isomorphic-git.org',
  url: 'https://github.com/isomorphic-git/isomorphic-git',
  ref: 'master',
  singleBranch: true,
  depth: 10
});

// Now it should not be empty...
await pfs.readdir(dir);

await git.log({dir})

await git.status({dir, filepath: 'README.md'})

await pfs.writeFile(`${dir}/README.md`, 'Very short README', 'utf8')
await git.status({dir, filepath: 'README.md'})

await git.add({dir, filepath: 'README.md'})
await git.status({dir, filepath: 'README.md'})

await pfs.writeFile(`${dir}/newfile.txt`, 'Hello World', 'utf8')
await git.status({dir, filepath: 'newfile.txt'})

await git.add({dir, filepath: 'newfile.txt'})
await git.status({dir, filepath: 'newfile.txt'})

await pfs.unlink(`${dir}/package.json`)
await git.status({dir, filepath: 'package.json'})

await git.remove({dir, filepath: 'package.json'})
x = await git.status({dir, filepath: 'package.json'})
console.log(x)

}

//})
