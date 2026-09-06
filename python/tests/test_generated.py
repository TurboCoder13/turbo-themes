# SPDX-License-Identifier: MIT
"""Tests for generated token types."""

import dataclasses
import importlib

import pytest
from assertpy import assert_that

from turbo_themes.generated import TurboTokens

# --- TurboTokens import ---


def test_can_import_from_generated() -> None:
    """Should be able to import TurboTokens from generated module."""
    module = importlib.import_module("turbo_themes.generated")

    assert_that(module.TurboTokens).is_same_as(TurboTokens)


def test_can_import_from_tokens_submodule() -> None:
    """Should be able to import from tokens submodule."""
    submodule = importlib.import_module("turbo_themes.generated.tokens")

    assert_that(submodule.TurboTokens).is_same_as(TurboTokens)


# --- TurboTokens dataclass ---


def test_turbo_tokens_is_dataclass() -> None:
    """TurboTokens should be a dataclass."""
    assert_that(dataclasses.is_dataclass(TurboTokens)).is_true()


def test_turbo_tokens_is_frozen() -> None:
    """TurboTokens should be frozen (immutable)."""
    tokens = TurboTokens()
    with pytest.raises(dataclasses.FrozenInstanceError):
        tokens.bg_base = "changed"


@pytest.mark.parametrize(
    "attr",
    [
        "spacing_xs",
        "spacing_sm",
        "spacing_md",
        "spacing_lg",
        "spacing_xl",
    ],
)
def test_turbo_tokens_has_spacing_token(attr: str) -> None:
    """Should have the given spacing token attribute.

    Args:
        attr: The spacing attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "elevation_none",
        "elevation_sm",
        "elevation_md",
        "elevation_lg",
        "elevation_xl",
    ],
)
def test_turbo_tokens_has_elevation_token(attr: str) -> None:
    """Should have the given elevation token attribute.

    Args:
        attr: The elevation attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "animation_duration_fast",
        "animation_duration_normal",
        "animation_duration_slow",
        "animation_easing_default",
        "animation_easing_emphasized",
    ],
)
def test_turbo_tokens_has_animation_token(attr: str) -> None:
    """Should have the given animation token attribute.

    Args:
        attr: The animation attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "opacity_disabled",
        "opacity_hover",
        "opacity_pressed",
    ],
)
def test_turbo_tokens_has_opacity_token(attr: str) -> None:
    """Should have the given opacity token attribute.

    Args:
        attr: The opacity attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "bg_base",
        "text_primary",
        "brand_primary",
    ],
)
def test_turbo_tokens_has_color_token(attr: str) -> None:
    """Should have the given color token attribute.

    Args:
        attr: The color attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "font_sans",
        "font_mono",
    ],
)
def test_turbo_tokens_has_typography_token(attr: str) -> None:
    """Should have the given typography token attribute.

    Args:
        attr: The typography attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(hasattr(tokens, attr)).is_true()


@pytest.mark.parametrize(
    "attr",
    [
        "bg_base",
        "spacing_md",
        "elevation_md",
    ],
)
def test_turbo_tokens_default_values_are_strings(attr: str) -> None:
    """All default values should be strings.

    Args:
        attr: The attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(getattr(tokens, attr)).is_instance_of(str)


@pytest.mark.parametrize(
    "attr",
    [
        "spacing_xs",
        "spacing_md",
        "spacing_xl",
    ],
)
def test_turbo_tokens_spacing_values_are_rem(attr: str) -> None:
    """Spacing values should be in rem units.

    Args:
        attr: The spacing attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(getattr(tokens, attr)).ends_with("rem")


@pytest.mark.parametrize(
    "attr",
    [
        "animation_duration_fast",
        "animation_duration_normal",
        "animation_duration_slow",
    ],
)
def test_turbo_tokens_animation_duration_values_are_ms(attr: str) -> None:
    """Animation duration values should be in ms units.

    Args:
        attr: The animation duration attribute name to check.
    """
    tokens = TurboTokens()
    assert_that(getattr(tokens, attr)).ends_with("ms")


def test_turbo_tokens_can_create_with_custom_values() -> None:
    """Should be able to create with custom values."""
    tokens = TurboTokens(
        bg_base="#ffffff",
        text_primary="#000000",
    )
    assert_that(tokens.bg_base).is_equal_to("#ffffff")
    assert_that(tokens.text_primary).is_equal_to("#000000")


def test_turbo_tokens_instance_equality() -> None:
    """Two instances with same values should be equal."""
    tokens1 = TurboTokens()
    tokens2 = TurboTokens()
    assert_that(tokens1).is_equal_to(tokens2)
