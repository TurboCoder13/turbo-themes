"""Tests for theme manager."""

import json

import pytest
from assertpy import assert_that

from turbo_themes.manager import (
    ThemeManager,
    get_theme_manager,
    set_theme,
    get_current_theme,
    cycle_theme,
)


def test_theme_manager_init():
    """Test theme manager initialization."""
    manager = ThemeManager()
    assert_that(manager.current_theme_id).is_equal_to("catppuccin-mocha")
    assert_that(manager.current_theme.id).is_equal_to("catppuccin-mocha")


def test_theme_manager_custom_default():
    """Test theme manager with custom default."""
    manager = ThemeManager("github-light")
    assert_that(manager.current_theme_id).is_equal_to("github-light")
    assert_that(manager.current_theme.appearance).is_equal_to("light")


def test_theme_manager_invalid_default():
    """Test theme manager with invalid default raises error."""
    with pytest.raises(ValueError, match="not found"):
        ThemeManager("nonexistent-theme")


def test_set_theme():
    """Test setting themes."""
    manager = ThemeManager("catppuccin-mocha")

    manager.set_theme("github-light")
    assert_that(manager.current_theme_id).is_equal_to("github-light")
    assert_that(manager.current_theme.appearance).is_equal_to("light")

    manager.set_theme("dracula")
    assert_that(manager.current_theme_id).is_equal_to("dracula")
    assert_that(manager.current_theme.appearance).is_equal_to("dark")


def test_set_invalid_theme():
    """Test setting invalid theme raises error."""
    manager = ThemeManager()

    with pytest.raises(ValueError, match="not found"):
        manager.set_theme("nonexistent-theme")


def test_get_theme():
    """Test getting specific themes."""
    manager = ThemeManager()

    theme = manager.get_theme("catppuccin-latte")
    assert_that(theme).is_not_none()
    assert_that(theme.id).is_equal_to("catppuccin-latte")
    assert_that(theme.appearance).is_equal_to("light")

    theme = manager.get_theme("nonexistent")
    assert_that(theme).is_none()


def test_get_themes_by_appearance():
    """Test filtering themes by appearance."""
    manager = ThemeManager()

    light_themes = manager.get_themes_by_appearance("light")
    assert_that(light_themes).is_instance_of(dict)
    assert_that(len(light_themes)).is_greater_than(0)
    for theme in light_themes.values():
        assert_that(theme.appearance).is_equal_to("light")

    dark_themes = manager.get_themes_by_appearance("dark")
    assert_that(dark_themes).is_instance_of(dict)
    assert_that(len(dark_themes)).is_greater_than(0)
    for theme in dark_themes.values():
        assert_that(theme.appearance).is_equal_to("dark")


def test_get_themes_by_vendor():
    """Test filtering themes by vendor."""
    manager = ThemeManager()

    catppuccin_themes = manager.get_themes_by_vendor("catppuccin")
    assert_that(catppuccin_themes).is_instance_of(dict)
    assert_that(len(catppuccin_themes)).is_greater_than(0)
    for theme in catppuccin_themes.values():
        assert_that(theme.vendor).is_equal_to("catppuccin")


def test_cycle_theme():
    """Test theme cycling."""
    manager = ThemeManager("catppuccin-mocha")

    # Cycle through all themes
    original = manager.current_theme_id
    manager.cycle_theme()
    assert_that(manager.current_theme_id).is_not_equal_to(original)

    # Cycle through light themes only
    manager.set_theme("github-light")
    original_light = manager.current_theme_id
    manager.cycle_theme("light")
    assert_that(manager.current_theme_id).is_not_equal_to(original_light)
    assert_that(manager.current_theme.appearance).is_equal_to("light")


def test_cycle_theme_empty():
    """Test cycling with no matching themes raises error."""
    manager = ThemeManager()

    with pytest.raises(ValueError, match="No themes found"):
        manager.cycle_theme("nonexistent-appearance")


def test_apply_theme_css_variables():
    """Test CSS variable generation."""
    manager = ThemeManager("catppuccin-mocha")

    variables = manager.apply_theme_to_css_variables()
    assert_that(variables).is_instance_of(dict)
    assert_that(len(variables)).is_greater_than(0)

    # Check some expected variables
    assert_that(variables).contains_key("--turbo-bg-base")
    assert_that(variables).contains_key("--turbo-text-primary")
    assert_that(variables).contains_key("--turbo-brand-primary")
    assert_that(variables).contains_key("--turbo-state-success")

    # Check values are strings
    for key, value in variables.items():
        assert_that(value).is_instance_of(str)
        assert_that(key).starts_with("--turbo-")


def test_export_theme_json():
    """Test JSON export."""
    manager = ThemeManager("catppuccin-mocha")

    # Export single theme
    json_str = manager.export_theme_json("catppuccin-latte")
    data = json.loads(json_str)
    assert_that(data).contains("catppuccin-latte")
    assert_that(data["catppuccin-latte"]["id"]).is_equal_to("catppuccin-latte")

    # Export all themes
    json_str = manager.export_theme_json()
    data = json.loads(json_str)
    assert_that(len(data)).is_greater_than(1)
    assert_that(data).contains("catppuccin-mocha")


def test_export_invalid_theme():
    """Test exporting invalid theme raises error."""
    manager = ThemeManager()

    with pytest.raises(ValueError, match="not found"):
        manager.export_theme_json("nonexistent")


def test_global_functions():
    """Test global convenience functions."""
    # Reset to default
    set_theme("catppuccin-mocha")
    assert_that(get_current_theme().id).is_equal_to("catppuccin-mocha")

    # Change theme
    set_theme("github-light")
    assert_that(get_current_theme().id).is_equal_to("github-light")

    # Cycle theme
    original = get_current_theme().id
    new_theme = cycle_theme()
    assert_that(new_theme).is_not_equal_to(original)
    assert_that(get_current_theme().id).is_equal_to(new_theme)


def test_get_theme_manager():
    """Test getting the global theme manager."""
    manager = get_theme_manager()
    assert_that(manager).is_instance_of(ThemeManager)
    assert_that(manager.current_theme_id).is_equal_to("catppuccin-mocha")
