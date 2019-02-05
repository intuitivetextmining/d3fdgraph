from setuptools import setup

setup(name='d3fdgraph',
	version='0.1',
	description='Interactive force-directed graph in a jupyter notebook.',
	url='https://github.com/intuitivetextmining/d3fdgraph',
	author='Intuitive Text Mining',
	author_email='intuitivetextmining@gmail.com',
	license='GPLv2',
	packages=['d3fdgraph'],
	install_requires=['IPython', 'networkx', 'networkx'],
	include_package_data=True,
	zip_safe=False)