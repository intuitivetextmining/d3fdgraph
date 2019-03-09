import pathlib
from setuptools import setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.rst").read_text()

setup(name='d3fdgraph',
	version='0.34',
	description='Interactive force-directed graph in a jupyter notebook.',
	long_description=README,
    long_description_content_type="text/x-rst",
	url='https://github.com/intuitivetextmining/d3fdgraph',
	author='Intuitive Text Mining',
	author_email='intuitivetextmining@gmail.com',
	license='GPLv2',
	packages=['d3fdgraph'],
	install_requires=['IPython', 'networkx', 'networkx'],
	include_package_data=True,
	zip_safe=False)