#!/usr/bin/python3
""" Tests Base for expected documentation, attributes and behavior """

from models.base_model import BaseModel
from datetime import datetime
from typing import get_type_hints
import inspect
import pep8 as pycodestyle
from models import storage
import unittest

module_doc = models.base_model.__doc__


class TestBaseModelDoc(unittest.TestCase):
    """ Tests for documentation of Base """

    def test_pycodestyle(self):
        """ Tests for proper code styling """
        for path in ['models/base_model.py',
                     'tests/test_models/test_base_model.py']:
            with self.subTest(path=path):
                errors = pycodestyle.Checker(path).check_all()
                self.assertEqual(errors, 0)

    def test_annotations(self):
        """ Tests Base methods to be type annotated """
        base = Base()
        methods = inspect.getmembers(base, predicate=inspect.ismethod)

        for m_name, method in methods:
            type_hints = get_type_hints(method)
            assertTrue(type_hints, f"{m_name} is missing type annotations")

    def test_module_documentation(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(module_doc, None,
                         "base_model.py needs a docstring")

    def test_class_documentation(self):
        """Test for the BaseModel class docstring"""
        self.assertIsNot(BaseModel.__doc__, None,
                         "BaseModel class needs a docstring")

    def test_func_documentation(self):
        """Test for the presence of docstrings in BaseModel methods"""
        base = Base()
        methods = inspect.getmembers(base, predicate=inspect.ismethod)

        for m_name, method in methods:
            docstring = method.__doc__
            self.assertIsNotNone(docstring, f"{m_name} is missing documentation")


class TestBaseModel(unittest.TestCase):
    """ Tests Base for the correct attrs and behavior """

    def test_has_attr_types(self):
        """ Tests Base for the correct attrs and types """
        base = BaseModel()
        self.assertIs(type(base), Base)
        inst.name = "Generic"
        exptd = { "id": str, "created_at": datetime, "name": str }

        for attr, typ in exptd.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertIn(attr, base.__dict__)
                self.assertIs(type(base.__dict__[attr]), typ)
    
        self.assertEqual(inst.name, "Generic")

    # Method Testing
    def test_str(self):
        """ Tests for the correct output of __str__ method """
        base = BaseModel()
        rtrnd =  f"[{base.__class__.__name__}] ({base.id}) {base.__dict__}"
        self.assertEqual(rtrnd, str(base))

    def test_to_dict(self):
        """ Tests for the correct return value of to_dict() """
        base = BaseModel()
        base_dict = base.to_dict()
        self.assertEqual(base_dit["__class__"], "BaseModel")
        self.assertEqual(type(base_dict["created_at"]), str)
        self.assertEqual(base_dict["created_at"], base.created_at.strftime("%Y-%m-%dT%Hi:%M:%S.%f"))

    def test_save(self):
        """ Tests for the save method to work as expected """
        base = BaseModel()
        objs_num = storage.all()
        base.save()
        self.assertEqual(storage.all() - 1, objs_num)

if __name__ == "__main__":
    unittest.main()

