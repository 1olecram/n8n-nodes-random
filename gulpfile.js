const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
	// Copy icons from nodes directory
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');
	src(nodeSource).pipe(dest(nodeDestination));

	// Copy icons from src/nodes directory
	const srcNodeSource = path.resolve('src', 'nodes', '**', '*.{png,svg}');
	const srcNodeDestination = path.resolve('dist', 'nodes');
	src(srcNodeSource).pipe(dest(srcNodeDestination));

	// Copy icons from credentials directory
	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}
