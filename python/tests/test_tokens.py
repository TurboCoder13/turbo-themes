from assertpy import assert_that

from turbo_themes import THEMES


def test_themes_present():
    assert_that(THEMES).is_not_empty()
