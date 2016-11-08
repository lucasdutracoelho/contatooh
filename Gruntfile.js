/* recebe o objeto grunt como parâmetro*/
module.exports = function(grunt) {
	
	grunt.initConfig({
		copy: {
			project: {
				/*
					quando true ativa o mapeamento dinâmico. No lugar de
					definirmos o nome de cada arquivo e seu destino, indicamos o diretório
					de trabalho ( cwd), a origem ( src) e o destino ( desc).
				*/
				expand: true,
				/*
					diretório padrão (current work directory) no qual as demais propriedades
					se basearão. Em nosso caso, queremos a própria pasta que
					contém nosso script Grunt, por isso utilizamos ‘.’.
				*/
				cwd: '.',
				/*
					array com os arquivos que devem ser copiados. Usamos o globbing
					pattern ‘**’ para copiar todos os arquivos e diretórios. Desconsideramos
					alguns arquivos adicionando o prefixo ! em cada um deles.
				*/
				src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
				/*
					pasta de destino. Em nosso caso, a pasta dist, que é criada caso
					não exista.
				*/
				dest: 'dist'
			}
		},
		clean: {
			dist: {
				//definimos o diretório que será apagado
				src: 'dist'
			}
		},
		//gerará configurações dinâmicas para grunt-contrib-concat, grunt-contrib-uglify, grunt-contrib-cssmin,
		usemin : {
			html: 'dist/app/views/**/*.ejs'
		},
		//alterará nossos arquivos HTML fazendo com que eles apontem para os arquivos concatenados e minificados
		//definidos nos comentários especiais, pois foram criados antes pela task useminPrepare.
		useminPrepare: {
			options: {
				root: 'dist/public',
				dest: 'dist/public'
			},
			html: 'dist/app/views/**/*.ejs'
		},
		//Task garante DI para o processo de minificação.
		ngAnnotate: {
			scripts: {
				expand: true,
				src: ['dist/public/js/**/*.js']
			},
		}
	});

	//Caso default = clean e copy
	grunt.registerTask('default', ['dist']);
	/*
		Primeiro parâmetro o nome da nossa task
		O segundo é um array como nome das tasks já configuradas peloGrunt. A ordem é importante
	*/
	grunt.registerTask('dist', ['clean', 'copy']);

	/*
		1) useminPrepare: lê os metadados das páginas e cria as configurações
		para as tasks concat, uglify e cssmin.
		2) concat: concatena os arquivos .js e .css utilizando como nome do
		arquivo a configuração gerada por useminPrepare.
		3) uglify: minifica scripts com base na configuração gerada por
		useminPrepare.
		4) cssmin: minifica arquivos css com base na configuração gerada por
		useminPrepare.
		5) usemin: por fim, altera o HTML para que aponte para os arquivos concatenados
		e minificados.
	*/
	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin']);
	//copia diretorio
	grunt.loadNpmTasks('grunt-contrib-copy');
	//apaga diretorio
	grunt.loadNpmTasks('grunt-contrib-clean');
	//concatena arquivos .css e .js.
	grunt.loadNpmTasks('grunt-contrib-concat');
	//minifica arquivos .js.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//minifica arquivos .css.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//preserva a DI do angular no processo de minificação
	grunt.loadNpmTasks('grunt-ng-annotate');

	/*
		analisa
		nossa página HTML em busca de metadados e, a partir das informações coletadas,
		gera configurações para as tasks envolvidas no processo de concatenação
		e minificação.
	*/
	grunt.loadNpmTasks('grunt-usemin');
};