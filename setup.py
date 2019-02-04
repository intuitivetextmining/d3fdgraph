from setuptools import setup

setup(name='d3fdgraph',
	version='0.1',
	description='Plots an interactive force directed graph in a jupyter notebook.',
	url='https://github.com/intuitivetextmining/intuitivetextmining/d3fdgraph',
	author='Tariq Rashid',
	author_email='intuitivetextmining@gmail.com',
	license='GPLv2',
	packages=['d3fdgraph'],
	install_requires=['random', 'IPython.core.display'],
	include_package_data=True,
	zip_safe=False)